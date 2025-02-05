import { getCurrentSession } from "@/actions/auth";


export default async function Home() {
  const { user } = await getCurrentSession();


  return (
    <div>
      {JSON.stringify(user)}
    </div>
  );
}
