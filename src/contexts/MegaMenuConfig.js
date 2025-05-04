// src/config/megaMenuItems.js
export const megaMenuItems = [
  {
    label: "Feature 1",
    path: "/products/feature-1",
    description: "Description for Feature 1",
    roles: ["admin", "user"], // visible to both
  },
  {
    label: "Feature 2 (Admin only)",
    path: "/products/feature-2",
    description: "Admin-only feature",
    roles: ["admin"], // only admins
  },
  {
    label: "Feature 3 (User only)",
    path: "/products/feature-3",
    description: "User-only feature",
    roles: ["user"], // only normal users
  },
];

// There are 3 rolses: admin, user, and owner