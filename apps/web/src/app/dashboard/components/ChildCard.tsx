"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Child } from '@repo/types';
import { motion } from "framer-motion";
import Link from 'next/link';

export default function ChildCard({ child,index }: {child:Child,index:number}) {
  return (
     <motion.div
              key={child.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{child.name}</h3>
                    <span className="text-sm text-gray-300">
                      Age {child.age}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded-xl text-black">
                      Weight
                      <p className="font-bold">{child.weight}kg</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl text-black">
                      Height
                      <p className="font-bold">{child.height}cm</p>
                    </div>
                  </div>

                  <Button  className="mt-4 w-full rounded-xl">
                   <Link href={`/dashboard/children/${child.id}`}> View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
  );
}