"use client";
import Layout from "../components/layout";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { set } from "mongoose";

export default function Component() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });
  const user: any = session?.user || {};
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);
  const sendMessage = async () => {
    try {
      await axios.post("/api/feedback", { message, name, email });
      setIsMessageSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Layout>
        {isMessageSent ? (
          <div className="flex items-center justify-center h-screen">
            <div>
              <div className="flex flex-col items-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-green-600 w-28 h-28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h1 className="text-4xl font-bold">Thank You !</h1>
                <p className="pl-4 pr-4 pb-2 text-center ">
                  We appreciate your willingness to help me make this services
                  even better.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <span className="text-sm font-medium">Home</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen pl-2 pr-2 lg:pr-48 lg:pl-48">
            <Card>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl pt-6 font-semibold">
                      👋 Help us improve
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      I am always looking for ways to improve this services, and
                      your feedback is essential to this process. Please take a
                      few minutes to share your thoughts and experiences with
                      us.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4"></div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      className="min-h-[100px]"
                      id="message"
                      value={message}
                      placeholder="Enter your message"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <Button
                    className="bg-gray-800 text-white"
                    type="submit"
                    onClick={sendMessage}
                  >
                    Send message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Layout>
    </>
  );
}
