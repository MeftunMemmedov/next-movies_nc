"use client";
import Heading from "@/app/(components)/Heading";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState<number>(1);
  const FAQ: { id: number; question: string; answer: string }[] = [
    {
      id: 1,
      question: "What is StreamVibe?",
      answer:
        "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: 2,
      question: "How much does StreamVibe cost?",
      answer:
        "StreamVibe offers flexible subscription plans to suit your needs. Pricing may vary depending on the selected plan.",
    },
    {
      id: 3,
      question: "What content is available on StreamVibe?",
      answer:
        "StreamVibe provides a wide range of content including movies, TV shows, and exclusive originals across multiple genres.",
    },
    {
      id: 4,
      question: "How can I watch StreamVibe?",
      answer:
        "You can watch StreamVibe on supported devices such as smart TVs, smartphones, tablets, and web browsers.",
    },
    {
      id: 5,
      question: "How do I sign up for StreamVibe?",
      answer:
        "You can sign up by creating an account on the StreamVibe website or app and choosing a subscription plan.",
    },
    {
      id: 6,
      question: "What is the StreamVibe free trial?",
      answer:
        "StreamVibe offers a free trial for new users so they can explore the platform before committing to a subscription.",
    },
    {
      id: 7,
      question: "How do I contact StreamVibe customer support?",
      answer:
        "You can contact customer support through the help center, email, or live chat available on the StreamVibe website.",
    },
    {
      id: 8,
      question: "What are the StreamVibe payment methods?",
      answer:
        "StreamVibe accepts various payment methods including credit/debit cards and other supported digital payment options.",
    },
  ];

  return (
    <section>
      <div className="container md:pt-36.5 pt-20">
        <div className="flex lg:flex-row flex-col items-center gap-3 justify-between md:pb-20 pb-10">
          <div className="xl:w-4/5 lg:1/2 w-full">
            <Heading
              title="Frequently Asked Questions"
              description="Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe."
            />
          </div>
          <div className="xl:w-1/5 lg:w-1/2 w-full flex items-center xl:justify-end lg:justify-center justify-start lg:p-3 py-2 rounded-xl">
            <button className="bg-main-red py-4.5 px-6 text-white rounded-xl">
              Ask a question
            </button>
          </div>
        </div>
        <ul className="lg:columns-2">
          {FAQ.map((faq, index) => (
            <li key={`home-faq-${faq.id}-${index}`} className="flex flex-col gap-5 py-3">
              <div className="flex gap-4">
                <div>
                  <div className="bg-secondary-black text-white size-12.5 rounded-md text-xl flex items-center justify-center">
                    {`0${index + 1}`}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => (activeFaq === faq.id ? setActiveFaq(0) : setActiveFaq(faq.id))}
                    className="w-full text-start flex items-center justify-between gap-2 lg:pr-14"
                  >
                    <h3 className="md:text-xl text-lg text-white pb-4 pt-3">{faq.question}</h3>
                    {activeFaq === faq.id ? (
                      <FaMinus color="white" className="lg:size-6 size-4" />
                    ) : (
                      <FaPlus color="white" className="lg:size-6 size-4" />
                    )}
                  </button>
                  <div
                    className={`${faq.id === activeFaq ? "max-h-18 pb-10" : "max-h-0"} transition-all overflow-hidden`}
                  >
                    <p className="text-gray-500 md:text-lg text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-linear-to-r from-transparent via-red-500/70 to-transparent"></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
