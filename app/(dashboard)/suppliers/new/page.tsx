import { RecordForm } from "@/components/shared/record-form";
export default function NewSupplierPage() { return <RecordForm kind="អ្នកផ្គត់ផ្គង់" title="បន្ថែមអ្នកផ្គត់ផ្គង់" description="រក្សាទុកព័ត៌មានដៃគូផ្គត់ផ្គង់ថ្មី។" fields={[{ label: "ឈ្មោះអ្នកផ្គត់ផ្គង់" }, { label: "អ្នកទំនាក់ទំនង" }, { label: "លេខទូរស័ព្ទ", type: "tel" }, { label: "អ៊ីមែល", type: "email" }]} />; }

