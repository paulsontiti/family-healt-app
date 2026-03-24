"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { toast } from "sonner";
import { useAuthStore } from "../../../../../store/useStore";

export default function FamilyAccessForm() {
  const [mode, setMode] = useState<"create" | "join">("create");

  const [familyName, setFamilyName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [families, setFamilies] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const setParent = useAuthStore(state => state.setParent)

  // CREATE FAMILY
  const handleCreate = async () => {
    if (!familyName) {
      setError("Family name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/families", { familyName });

      localStorage.setItem("parent", JSON.stringify(res.data));

      toast.success("Family created successfully 🎉");
      window.location.reload();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // SEARCH FAMILY
  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      setSearching(true);
      setError("");

      const res = await api.get(`/families/search?name=${searchQuery}`);
      setFamilies(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Search failed");
    } finally {
      setSearching(false);
    }
  };

  // JOIN FAMILY
  const handleJoin = async (familyId: string) => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post(`/families/${familyId}/join`);

     setParent(res.data)

      toast.success("Joined family successfully 🎉");
      window.location.reload();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to join family");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-2xl font-bold">
              Family Setup 👨‍👩‍👧
            </CardTitle>

            {/* Toggle Tabs */}
            <div className="flex gap-2 justify-center">
              <Button
                variant={mode === "create" ? "default" : "outline"}
                onClick={() => setMode("create")}
              >
                Create
              </Button>
              <Button
                variant={mode === "join" ? "default" : "outline"}
                onClick={() => setMode("join")}
              >
                Join
              </Button>
            </div>

            <p className="text-gray-500 text-sm">
              {mode === "create"
                ? "Create a new family to start tracking your children."
                : "Search and join an existing family."}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* CREATE MODE */}
            {mode === "create" && (
              <>
                <div>
                  <Label>Family Name</Label>
                  <Input
                    placeholder="e.g. The Johnsons"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full rounded-xl"
                  onClick={handleCreate}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Family"}
                </Button>
              </>
            )}

            {/* JOIN MODE */}
            {mode === "join" && (
              <>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search family name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button onClick={handleSearch} disabled={searching}>
                    {searching ? "..." : "Search"}
                  </Button>
                </div>

                {/* RESULTS */}
                <div className="space-y-2">
                  {families.length === 0 && !searching && (
                    <p className="text-sm text-gray-500 text-center">
                      No families found
                    </p>
                  )}

                  {families.map((family) => (
                    <div
                      key={family.id}
                      className="flex items-center justify-between border p-3 rounded-xl"
                    >
                      <div>
                        <p className="font-medium">{family.familyName}</p>
                        <p className="text-xs text-gray-500">
                          {family.membersCount} members
                        </p>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handleJoin(family.id)}
                        disabled={loading}
                      >
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ERROR */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}