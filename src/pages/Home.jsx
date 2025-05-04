import DataTable from "@/components/DataTable";
import { getUsers } from "@/services/public/userService";
import InfoCard from "@/components/InfoCard";
import {
  BuildingOffice2Icon,
  TruckIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  // Define your table columns
  const columns = [
    { header: "table.table_home.columns.room", accessor: "id" },
    { header: "table.table_home.columns.rental", accessor: (row) => row.name },
    { header: "table.table_home.columns.type", accessor: (row) => row.year },
    { header: "table.table_home.columns.amount", accessor: "pantone_value" },
  ];
  const stats = [
    {
      titleKey: "total_rooms",
      value: 24,
      trend: { text: "+2 空房", type: "positive" },
      icon: BuildingOffice2Icon,
    },
    {
      titleKey: "parking_spots",
      value: 12,
      trend: { text: "已滿", type: "negative" },
      icon: TruckIcon,
    },
    {
      titleKey: "monthly_revenue",
      value: "$342,800",
      trend: { text: "+2.5%", type: "positive" },
      icon: CurrencyDollarIcon,
    },
    {
      titleKey: "outstanding",
      value: "$24,500",
      trend: { text: "5 筆", type: "negative" },
      icon: DocumentTextIcon,
    },
  ];

  // Handlers for create/update/delete
  const handleCreate = () => {
    console.log("Create clicked");
    // e.g. open a modal or navigate to a post-creation page
  };
  const handleUpdate = (row) => {
    console.log("Update row:", row);
    // e.g. open edit modal pre-filled with `row`
  };
  const handleDelete = (row) => {
    if (window.confirm(`Delete post #${row.id}?`)) {
      setPosts((prev) => prev.filter((p) => p.id !== row.id));
    }
  };

  return (
    <div className="p-9">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <InfoCard key={s.titleKey} {...s} />
        ))}
      </div>
      <DataTable
        title="table.table_home.title"
        moduleTitle="Users Info"
        columns={columns}
        fetchService={getUsers}
        onCreate={() => console.log("create")}
        onUpdate={(row) => console.log("update", row)}
        onDelete={(row) => console.log("delete", row)}
      />
    </div>
  );
}
