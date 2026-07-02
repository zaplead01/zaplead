import { InvitePageContent } from "@/src/components/invite/invite-page-content";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export default async function InvitePage({
  params,
}: Props) {
  const { token } = await params;

  return (
    <InvitePageContent token={token} />
  );
}