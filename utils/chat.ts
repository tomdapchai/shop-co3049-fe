import { embeddings, llm } from "@/lib/openAI";
import { supabaseClient } from "@/lib/supabaseClient";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import {
    RunnablePassthrough,
    RunnableSequence,
} from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";

export interface ChatMessage {
    role: string;
    message: string;
}

// Get AI answer without storing in database, using knowledge from all files
export async function getAnswer(question: string): Promise<ChatMessage> {
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
        embeddings,
        {
            client: supabaseClient,
            tableName: "documents",
            queryName: "match_documents",
        }
    );

    // Query all documents without file filtering
    const retriever = vectorStore.asRetriever({
        k: 10, // Increased k to get more relevant context from various files
    });

    const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
        1. Read the context carefully before answering the question.
        2. The company - Furnora, is a furniture company, so the question should be related to furniture or the company - Furnora.
        2. If the question is about furniture suggestions, and there is not enough information in the context, you can give answers outside the context that still relevant to the question in your capability.
        3. If you don't know the answer and the question is not relevant to furniture or the company - Furnora, try suggesting other furniture relevant questions, don't try to make up an answer or answer anything isn't relevant to furniture or context.
        4. No directly mention any specific person in the answer if the question doesn't require that.
        5. Answer the question in Vietnamese, even if the question is in English.
      ----------------
      {context}`;
    /* const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
        1. Read the context carefully before answering the question.
        2. If you don't know the answer, don't try to make up an answer.
        3. Answer the question in Vietnamese, even if the question is in English.
      ----------------
      {context}`; */

    const messages = [
        SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
        HumanMessagePromptTemplate.fromTemplate("{question}"),
    ];
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([
        {
            context: retriever.pipe(formatDocumentsAsString),
            question: new RunnablePassthrough(),
        },
        prompt,
        llm,
        new StringOutputParser(),
    ]);

    const answer = await chain.invoke(question);

    // Return the bot message without storing in database
    return {
        role: "bot",
        message: answer,
    };
}
