This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase configuration

The contenedores pages are backed by Supabase. To connect your own project:

1. Create a Supabase project and copy the project URL, anon key, and service role key (service role is used only on the server).
2. Duplicate `.env.example` to `.env.local` and fill in:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Generate database types once your schema is ready:
   ```bash
   npx supabase gen types typescript --project-id <your-project-id> --schema public > lib/database.types.ts
   ```
   The current file defines the expected `contenedores` table shape.
4. The shared clients live in `lib/supabaseClient.ts` and are used by server components (`createSupabaseServerClient`) and client components (`getSupabaseBrowserClient`).

### Data flow

- `app/contenedores/page.tsx` loads the `contenedores` table on the server and renders the client UI in `components/containers-client.tsx`.
- `components/container-management.tsx` handles create/update/delete operations against Supabase directly from the browser using the anon key. Rules/permissions are enforced by your Supabase RLS policies.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - learn how to secure tables with RLS and generate TypeScript types.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
