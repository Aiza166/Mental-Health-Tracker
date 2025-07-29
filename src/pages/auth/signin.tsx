import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>Email address</label>
      <input type="email" name="email" required />
      <button type="submit">Sign in with Magic Link</button>
    </form>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
