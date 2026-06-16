"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import Image from "next/image";
import { useContent } from "@/components/ContentProvider";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const DATA = useContent();

  // Section masquée tant qu'aucun témoignage n'est renseigné dans lib/data.ts.
  if (DATA.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="dark:bg-dark-bg bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
          <p className="text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DATA.testimonials.map((item, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <Quote className="text-primary-500 mb-4" size={28} />
              <blockquote className="mb-6 flex-1 text-slate-700 dark:text-slate-300">
                “{item.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {item.avatar && (
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold">{item.author}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{item.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
