export const ownersData = [
  {
    id: "42",
    name: "林志明",
    properties: [
      {
        id: "201",
        type: "rooms",
        label: "201室",
        rent: "$15000",
        tenant: "張小明",
        decorationStatus: "已完工",
        rentPaid: true,
        utilityPaid: false,
        lastPaymentDate: "2024-02-10",
        nextPaymentDate: "2024-03-10",
        statusBadge: "rented", // map to t("rented") = "已出租"
      },
      {
        id: "202",
        type: "rooms",
        label: "202室",
        rent: "$14000",
        tenant: "",
        decorationStatus: "已完工",
        rentPaid: false,
        utilityPaid: false,
        statusBadge: "vacant", // map to t("vacant") = "空置中"
      },
      {
        id: "P02",
        type: "parking",
        label: "車位 P02",
        rent: "$2500",
        tenant: "",
        decorationStatus: null,
        rentPaid: false,
        utilityPaid: false,
        lastPaymentDate: null,
        nextPaymentDate: null,
        statusBadge: "vacant", // map to t("vacant") = "空置中"
      }
    ],
    parking: [
      {
        id: "P01",
        type: "parking",
        label: "車位 P01",
        rent: "$2500",
        tenant: "張小明",
        decorationStatus: null,
        rentPaid: true,
        utilityPaid: true,
        lastPaymentDate: "2024-02-10",
        nextPaymentDate: null,
        statusBadge: "rented",
      },
      {
        id: "P02",
        type: "parking",
        label: "車位 P02",
        rent: "$2500",
        tenant: "",
        decorationStatus: null,
        rentPaid: false,
        utilityPaid: false,
        lastPaymentDate: null,
        nextPaymentDate: null,
        statusBadge: "vacant",
      },
      
    ],
    incomeSummary: {
      total: "$31500",
      cycle: "monthly", // maps to t("monthly")
      deductions: [
        { label: "commission", rate: 5, amount: "$1575" },
        { label: "management_fee", rate: 3, amount: "$945" },
        { label: "other_fee", rate: 1, amount: "$315" },
      ],
      net: "$28665",
    },
    paymentRecords: [
      { type: "rent", date: "2024-02-10", amount: "$28665" },
      { type: "rent", date: "2024-01-10", amount: "$28665" },
      { type: "rent", date: "2023-12-10", amount: "$28665" },
      { type: "rent", date: "2023-11-10", amount: "$28665" },
      { type: "rent", date: "2023-10-10", amount: "$28665" },
      { type: "rent", date: "2023-09-10", amount: "$28665" },
      { type: "rent", date: "2023-08-10", amount: "$28665" },
      { type: "rent", date: "2023-07-10", amount: "$28665" },
      { type: "rent", date: "2023-06-10", amount: "$28665" },
      { type: "rent", date: "2023-05-10", amount: "$28665" },
      { type: "rent", date: "2023-04-10", amount: "$28665" },
      { type: "rent", date: "2023-03-10", amount: "$28665" },
    ],
  },
];
