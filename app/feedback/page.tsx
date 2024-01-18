"use client";
import Layout from "../components/layout";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

export default function Component() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });
  const user: any = session?.user || {};
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [message, setMessage] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(true);
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
          <div className="flex items-center justify-center pt-20">
            <div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/ThankYouComputer.png"
                  width={300}
                  height={300}
                  alt="Thank you"
                />
                <h1 className="text-4xl font-bold">Thank You !</h1>
                <p className="pl-4 pr-4 pb-2 text-center ">
                  We appreciate your willingness to help me make this services
                  even better.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 text-white bg-[#1b4c82] border border-[#1b4c82] rounded-full hover:bg-[#2a4460] focus:outline-none focus:ring"
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
          <div>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              <div className="mx-auto max-w-2xl">
                <div className="text-center">
                  <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                    Write your feedback
                  </h2>
                </div>

                <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
                  <div className="mb-4 sm:mb-8">
                    <label className="block mb-2 text-sm font-medium dark:text-white">
                      Full name
                    </label>
                    <input
                      disabled
                      type="text"
                      id="hs-feedback-post-comment-name-1"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Full name"
                      value={name}
                    />
                  </div>

                  <div className="mb-4 sm:mb-8">
                    <label className="block mb-2 text-sm font-medium dark:text-white">
                      Email address
                    </label>
                    <input
                      disabled
                      type="email"
                      value={email}
                      id="hs-feedback-post-comment-email-1"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Email address"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium dark:text-white">
                      Comment
                    </label>
                    <div className="mt-1">
                      <textarea
                        required
                        onChange={(e) => setMessage(e.target.value)}
                        id="hs-feedback-post-comment-textarea-1"
                        name="hs-feedback-post-comment-textarea-1"
                        rows={3}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-[#1b4c82] focus:ring-[#1b4c82]disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Leave your comment here..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6 grid">
                    <button
                      onClick={sendMessage}
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#1b4c82] text-white hover:bg-[#365679] disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
