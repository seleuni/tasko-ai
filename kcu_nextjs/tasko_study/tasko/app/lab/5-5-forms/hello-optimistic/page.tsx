import MessageBoard from "./MessageBoard";
import { messages } from "./store";

export const dynamic = "force-dynamic";

export default function HelloOptimisticPage() {
  return <MessageBoard messages={messages} />;
}
