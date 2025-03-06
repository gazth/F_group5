"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TextReader() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleProcess = () => {
    setOutputText(inputText);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">テキストリーダー</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">入力テキスト:</h3>
            <Textarea
              placeholder="ここにテキストを入力してください..."
              value={inputText}
              onChange={handleInputChange}
              rows={6}
              className="w-full resize-none"
            />
          </div>

          {outputText && (
            <div>
              <h3 className="text-lg font-medium mb-2">出力テキスト:</h3>
              <Card className="bg-muted">
                <ScrollArea className="h-[200px] w-full p-4">
                  <div className="whitespace-pre-wrap">{outputText}</div>
                </ScrollArea>
              </Card>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClear}>
            クリア
          </Button>
          <Button onClick={handleProcess}>処理</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
