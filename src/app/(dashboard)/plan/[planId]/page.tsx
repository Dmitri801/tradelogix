interface PageProps {
  params: { planId: string };
}

const Page = async ({ params }: PageProps) => {
  const { planId } = await params;
  return <div>Dashboard Plan Page for {planId}</div>;
};

export default Page;
