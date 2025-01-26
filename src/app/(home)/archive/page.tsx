import useRedirect from "@/hooks/useRedirect";

export default async function page() {
  await useRedirect();
  return (
    <>
      <h1>Archive</h1>
    </>
  );
}
