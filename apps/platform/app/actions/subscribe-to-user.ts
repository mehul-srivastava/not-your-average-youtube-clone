"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function addSubscriptionAction(userId: string) {}
