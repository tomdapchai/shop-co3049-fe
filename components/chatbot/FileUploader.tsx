"use client";
import { ChangeEvent, MouseEvent, useState } from "react";
//import { Box, Button, Typography } from "@mui/material";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { IFile, saveFile } from "@/utils/file";

export default function FileUploader({
    onSave,
}: {
    onSave: (file: IFile) => void;
}) {
    const [inputFile, setInputFile] = useState<File | undefined>(undefined);
    const [uploading, setUploading] = useState<boolean>(false);

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        setInputFile(file);
    };

    const handleSaveFile = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!inputFile) return;
        try {
            setUploading(true);
            const file = await saveFile(inputFile);
            onSave(file);
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="block mb-2 w-full">
                <input
                    accept="application/pdf"
                    id="file-uploader"
                    type="file"
                    style={{ display: "none" }}
                    onChange={onChangeFile}
                />
                <Button
                    className="w-full"
                    onClick={() =>
                        document.getElementById("file-uploader")?.click()
                    }>
                    <Label>{inputFile ? inputFile.name : "Select File"}</Label>
                </Button>
            </div>

            <Button
                className="w-full"
                color="primary"
                disabled={!inputFile || uploading}
                onClick={handleSaveFile}>
                <Label>Upload</Label>
            </Button>
        </>
    );
}
