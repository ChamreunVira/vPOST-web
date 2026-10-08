import { RecordForm } from "@/components/shared/record-form";
export default function NewUserPage() { return <RecordForm kind="ក្រុមការងារ" title="អញ្ជើញអ្នកប្រើប្រាស់" description="បង្កើតគណនីសម្រាប់សមាជិកក្រុមការងាររបស់អ្នក។" fields={[{ label: "ឈ្មោះពេញ" }, { label: "អ៊ីមែល", type: "email" }, { label: "តួនាទី", placeholder: "អ្នកលក់ / អ្នកគ្រប់គ្រង" }]} />; }

