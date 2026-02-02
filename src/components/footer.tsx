"use client";

import { Card, CardContent } from "@/components/ui/card";
import { footerNavItems } from "@/lib/nav-data";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

function Footer() {
  const pathname = usePathname();

  return (
    <motion.footer
      className=" sticky   bottom-0  "
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <Card className="p-4 pb-10 bg-background text-background border-b-0 border-x-0 rounded-none  ">
        <CardContent>
          <motion.nav layout>
            <motion.ul layout className="flex justify-between">
              {footerNavItems.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.url !== "/" && pathname.startsWith(`${item.url}/`));

                return (
                  <motion.li key={item.title} layout className="list-none">
                    <Button
                      size={"lg"}
                      className="rounded-2xl"
                      variant={isActive ? "default" : "secondary"}
                      asChild
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-1"
                      >
                        <motion.span
                          layout
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1"
                        >
                          {item.icon}
                          <AnimatePresence mode="popLayout">
                            {isActive && (
                              <motion.span
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.title}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.span>
                      </Link>
                    </Button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.nav>
        </CardContent>
      </Card>
    </motion.footer>
  );
}

export default Footer;
