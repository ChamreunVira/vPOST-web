import { RecordForm } from "@/components/shared/record-form";
export default function NewCustomerPage() { return <RecordForm kind="អតិថិជន" title="បន្ថែមអតិថិជន" description="បង្កើតកំណត់ត្រាអតិថិជនថ្មីសម្រាប់ប្រវត្តិការទិញ។" fields={[{ label: "ឈ្មោះអតិថិជន" }, { label: "លេខទូរស័ព្ទ", type: "tel" }, { label: "អ៊ីមែល", type: "email" }]} />; }

