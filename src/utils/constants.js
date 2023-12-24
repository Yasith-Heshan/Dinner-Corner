export const STATUS = {
    accepted: 'ACCEPTED',
    pending: 'PENDING',
    rejected: 'REJECTED',
    canceled: 'CANCELED',
    delivered: 'DELIVERED'
}

export const PLACES = {
    frontGate: "Front Gate",
    backGate: "Back Gate",
    boardingPlace: "Boarding Place",
    boysHostal01: "Patuwaththa Hostel",
    boysHostal02: "New Boys Hostel"
}

export const company_emails = [process.env.NEXT_PUBLIC_MANAGER_1_EMAIL,
    process.env.NEXT_PUBLIC_MANAGER_2_EMAIL,
    process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    process.env.NEXT_PUBLIC_MANAGER_3_EMAIL,
    process.env.NEXT_PUBLIC_MANAGER_4_EMAIL]

export const DEADLINE = '15:30'