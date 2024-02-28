import Conversation from "@/components/conversation";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen mx-auto ">
      <Conversation />
    </div>
  );
}
