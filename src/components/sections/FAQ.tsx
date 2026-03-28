"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is a crypto wallet?",
    answer: "Thinking about buying crypto or NFTs? You'll need a crypto wallet. When you create a wallet, two keys are generated: a private one and a public one. The wallet stores your keys and enables you to sign transactions, generate new addresses, initiate transfers, track portfolio balances, manage your crypto, and interact with dApps. Crypto wallets come in many forms, from hardware wallets, like Ledger's, to mobile apps that you can download on your phone or tablet."
  },
  {
    question: "How do crypto wallets work?",
    answer: "When you buy crypto like Bitcoin and Ethereum, you're issued two keys: one is public and the other is private. The public key can be compared to a bank account number that you can share with third parties to receive crypto without worrying that your assets will be compromised. The private key signs transactions and allows you to send and receive crypto. It's crucial to keep your private keys secure and secret. If anyone has access to them, they will also have access to any crypto assets associated with those keys. A crypto wallet stores your private keys and gives you access to your assets."
  },
  {
    question: "What are the different types of crypto wallets?",
    answer: "There are different types of crypto wallets, each with its own benefits and drawbacks. Hot wallets are connected to the internet and usually convenient to use, however, they are also vulnerable to online attacks. Examples include web-based, mobile, and desktop wallets. Cold wallets keep your private keys offline and out of reach of online threats. Examples include paper and hardware wallets. Wallets can also be categorized as custodial or non-custodial, depending on who holds the private keys. Storing your crypto in a custodial wallet means that a third party controls your private keys and, therefore, your assets. In contrast, non-custodial wallets, like Ledger's, enable you to fully own and control your crypto."
  },
  {
    question: "Why do I need a hardware wallet?",
    answer: "Hot wallets store private keys on systems connected to the internet, which makes them susceptible to online attacks. Keeping your crypto on an exchange also means you have no true ownership or control over it. If the exchange files for bankruptcy or pauses withdrawals, you lose access to your funds. Hardware wallets store your private keys offline, giving you full control and enhanced security. Even if you misplace or lose your hardware wallet, you can get a new one and use your Secret Recovery Phrase to access your assets."
  },
  {
    question: "How to get a crypto wallet?",
    answer: "Ready to get started? Here are the steps for getting your crypto wallet: 1. Get a Ledger hardware wallet. It stores your private keys in a secure, offline environment giving you peace of mind and complete control over your assets. All Ledger crypto wallets are powered by an industry-leading Secure Element chip, together with Ledger's proprietary OS that protects your crypto & NFTs from sophisticated hacks. 2. Pair your Ledger crypto wallet with the Ledger Wallet app to easily manage your crypto, keep track of your portfolio, and securely access a wide range of dApps and Web3 services. All in one convenient place! 3. Add crypto to your Ledger wallet. Ledger has integrated leading third-party providers to make it possible to buy, swap, stake, and manage crypto through the Ledger Wallet app. Your crypto will be sent to the safety of your Ledger hardware wallet."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            FAQ
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to some of the most common questions.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-base font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-500 transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}