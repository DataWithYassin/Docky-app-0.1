
# Bug Report: "Total Users" Stat Card Incorrectly Counts All User Roles

**File:** `components/AdminDashboardView.tsx`

**Line Number:** 212

**Description:**

The "Total Users" stat card on the Admin Dashboard is currently displaying a count of all users in the system, including both "Job Seekers" and "Businesses". This is misleading, as there is a separate stat card specifically for "Total Businesses". The "Total Users" card should only reflect the number of "Job Seekers".

**Impact:**

This bug causes confusion for the admin user, as the "Total Users" count is inflated and does not accurately represent the number of job seekers on the platform. This could lead to incorrect assumptions about the user base and misinformed business decisions.

**Proposed Fix:**

The `value` prop of the "Total Users" `StatCard` component should be changed from `users.length` to `jobSeekers.length`. This will ensure that only the number of job seekers is displayed, providing an accurate and meaningful metric for the admin.
