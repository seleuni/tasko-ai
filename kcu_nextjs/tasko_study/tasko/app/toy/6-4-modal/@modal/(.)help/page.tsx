import HelpContent from "@/components/HelpContent";
import Modal from "@/components/Modal";

export default function HelpModalPage(){
  return (
    <Modal>
      <HelpContent/>
      <a href="/toy/6-4-modal/help" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
      전체 화면으로 보기
      </a>
    </Modal>
  );
}
