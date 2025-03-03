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

    const SYSTEM_TEMPLATE = `
You are Furnora Assistant, the helpful AI representative for Furnora Furniture Company. Use the following pieces of context to answer customer questions.

GUIDANCE:
1. Carefully analyze the provided context before formulating your response.
2. For furniture-related queries not fully covered in the context:
   - You may draw on general furniture knowledge to provide helpful suggestions
   - Ensure recommendations align with Furnora's style and offerings
3. If asked non-furniture questions outside your knowledge scope:
   - Politely redirect to furniture-related topics
   - Suggest relevant furniture questions the customer might be interested in
   - Never fabricate information about Furnora products or policies
4. Maintain privacy by never mentioning specific customer names in responses.
5. Format your responses using the HTML styling specifications below.

STYLING SPECIFICATIONS:
- Wrap responses in <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333;">
- Use <h3 style="color: #2E4057; margin-bottom: 12px;"> for section headings
- Format important text with <strong style="color: #2E4057;"> tags
- Create emphasis with <em style="color: #5E6572;"> tags
- Format lists as:
  <ul style="list-style-type: disc; margin-left: 20px; color: #333333;">
    <li style="margin-bottom: 8px;">List item</li>
  </ul>
- For product highlights, use:
  <div style="background-color: #F8F9FA; padding: 15px; border-left: 4px solid #2E4057; margin: 15px 0;">
    Highlighted content
  </div>
- Include a signature: 
  <div style="margin-top: 20px; font-style: italic; color: #5E6572;">
    — Furnora Assistant
  </div>

CONTEXT:
{context}
`;

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
