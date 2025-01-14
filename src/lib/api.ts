"use server";

import { cookies } from "next/headers";
import { Agent } from "./types/agent";

export async function queryAgent(agent: Agent, query: string) {
  try {
    const nextCookies = cookies().getAll();
    const cookieHeader = nextCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    const params = new URLSearchParams({ query: query });

    const response = await fetch(`${process.env.API_URL}/agents`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ agent, query }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("API Error:", response.status, errorMessage);
      throw new Error(
        `Failed to fetch flow information. Status: ${response.status}, error: ${errorMessage}`
      );
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching flow info:", error);
    throw error;
  }
}

export async function fetchFlowDiagram(query: string) {
  try {
    const nextCookies = cookies().getAll();
    const cookieHeader = nextCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    const params = new URLSearchParams({ query: query });

    const response = await fetch(
      `${process.env.API_URL}/flow-diagram-knowledge-graph/?${params}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("API Error:", response.status, errorMessage);
      throw new Error(
        `Failed to fetch flow information. Status: ${response.status}, error: ${errorMessage}`
      );
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching flow info:", error);
    throw error;
  }
}

export async function flowChat(query: string) {
  try {
    const nextCookies = cookies().getAll();
    const cookieHeader = nextCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    const params = new URLSearchParams({ query: query });

    const response = await fetch(
      `${process.env.API_URL}/flow-chat/?${params}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("API Error:", response.status, errorMessage);
      throw new Error(
        `Failed to fetch flow information. Status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching flow info:", error);
    throw error;
  }
}
