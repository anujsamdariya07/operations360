import { create } from 'zustand';
import toast from 'react-hot-toast';

const useObjectStore = create((set, get) => ({
  // Initial empty org state for signup
  organization: {
    name: '',
    mobileNo: '8839955127',
    email: 'shripackvijay@gmail.com',
    password: 'shreejee',
    gstNo: '23JLOPS6335E1ZP',
    address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
    employees: [
      {
        id: 'EMP001',
        name: 'Vijay',
        username: 'vijay',
        password: 'pwd',
        mustChangePassword: true,
        role: 'admin',
        mobileNo: '7000000001',
        address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
      },
      {
        id: 'EMP008',
        name: 'Kiran',
        username: 'kiran.sjp',
        password: 'pwd',
        mustChangePassword: true,
        role: 'employee',
        mobileNo: '7000000001',
        address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
      },
      {
        id: 'EMP002',
        name: 'Aadesh',
        username: 'aadesh.sjp',
        password: 'pwd',
        mustChangePassword: true,
        role: 'employee',
        mobileNo: '7000000002',
        address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
      },
      {
        id: 'EMP003',
        name: 'Madhu',
        username: 'madhu.sjp',
        password: 'pwd',
        mustChangePassword: true,
        role: 'employee',
        mobileNo: '7000000003',
        address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
      },
      {
        id: 'EMP004',
        name: 'Narendra',
        username: 'narendra.sjp',
        password: 'pwd',
        mustChangePassword: true,
        role: 'employee',
        mobileNo: '7000000004',
        address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
      },
      {
        id: 'EMP005',
        name: 'Raja',
        username: 'raja.sjp',
        password: 'pwd',
        mustChangePassword: true,
        role: 'employee',
        mobileNo: '7000000005',
        address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
      },
      {
        id: 'EMP006',
        name: 'Vijay',
        username: 'vijay.sjp',
        password: 'pwd',
        mustChangePassword: true,
        role: 'manager',
        mobileNo: '7000000006',
        address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
      },
      {
        id: 'EMP007',
        name: 'Shushil',
        username: 'shushil.sjp',
        password: 'pwd',
        mustChangePassword: true,
        role: 'employee',
        mobileNo: '7000000007',
        address: 'New Ram Nagar, Adhartal, Jabalpur, MP',
      },
    ],
    orders: [
      {
        orgId: '663fd4f1468f3b1234567890',
        customerId: '663fd5a1468f3b1234567891',
        employeeId: '663fd603468f3b1234567892',
        items: [
          { item: '6640a0de1234567890abcde1', quantity: 100, priceAtOrder: 10 },
          { item: '6640a0de1234567890abcde2', quantity: 50, priceAtOrder: 20 },
        ],
        totalAmount: 100 * 10 + 50 * 20, // 1000 + 1000 = 2000
        status: 'pending',
        orderDate: new Date('2025-05-10'),
        notes: 'Deliver in 3 days',
      },
      {
        orgId: '663fd4f1468f3b1234567890',
        customerId: '663fd5a1468f3b1234567892',
        employeeId: '663fd603468f3b1234567893',
        items: [
          {
            item: '6640a0de1234567890abcde3',
            quantity: 150,
            priceAtOrder: 12.5,
          },
        ],
        totalAmount: 150 * 12.5, // 1875
        status: 'processing',
        orderDate: new Date('2025-05-08'),
        notes: 'Glossy finish required',
      },
      {
        orgId: '663fd4f1468f3b1234567890',
        customerId: '663fd5a1468f3b1234567893',
        employeeId: '663fd603468f3b1234567894',
        items: [
          { item: '6640a0de1234567890abcde4', quantity: 70, priceAtOrder: 18 },
          { item: '6640a0de1234567890abcde5', quantity: 30, priceAtOrder: 25 },
        ],
        totalAmount: 70 * 18 + 30 * 25, // 1260 + 750 = 2010
        status: 'completed',
        orderDate: new Date('2025-05-05'),
        notes: 'Delivered to warehouse gate',
      },
      {
        orgId: '663fd4f1468f3b1234567890',
        customerId: '663fd5a1468f3b1234567894',
        employeeId: '663fd603468f3b1234567895',
        items: [
          {
            item: '6640a0de1234567890abcde6',
            quantity: 200,
            priceAtOrder: 9.5,
          },
        ],
        totalAmount: 200 * 9.5, // 1900
        status: 'processing',
        orderDate: new Date('2025-05-09'),
        notes: '',
      },
      {
        orgId: '663fd4f1468f3b1234567890',
        customerId: '663fd5a1468f3b1234567895',
        employeeId: '663fd603468f3b1234567896',
        items: [
          { item: '6640a0de1234567890abcde7', quantity: 120, priceAtOrder: 11 },
          { item: '6640a0de1234567890abcde8', quantity: 60, priceAtOrder: 15 },
        ],
        totalAmount: 120 * 11 + 60 * 15, // 1320 + 900 = 2220
        status: 'cancelled',
        orderDate: new Date('2025-05-06'),
        notes: 'Order cancelled by customer',
      },
    ],
    customers: [
      {
        organization: '663fd4f1468f3b1234567890', // Replace with actual Organization ObjectId
        name: 'Madhuram Sweets and Namkeen',
        mobileNo: '9876543210',
        email: 'madhuram@example.com',
        address: 'Gorakhpur Main Road, Jabalpur',
        employeeDetails: ['663fd603468f3b1234567892'], // Optional: linked employee ObjectIds
        items: ['6640a0de1234567890abcde1', '6640a0de1234567890abcde2'], // Product ObjectIds
      },
      {
        organization: '663fd4f1468f3b1234567890',
        name: 'Oven Classic',
        mobileNo: '9123456789',
        email: 'ovenclassic@example.com',
        address: 'Napier Town, Jabalpur',
        employeeDetails: ['663fd603468f3b1234567893'],
        items: ['6640a0de1234567890abcde3'],
      },
      {
        organization: '663fd4f1468f3b1234567890',
        name: 'Indore Sweets and Namkeen',
        mobileNo: '9988776655',
        email: 'indoresweets@example.com',
        address: 'Rajendra Nagar, Indore',
        employeeDetails: ['663fd603468f3b1234567894'],
        items: ['6640a0de1234567890abcde4'],
      },
      {
        organization: '663fd4f1468f3b1234567890',
        name: 'Chandrakala Sweets',
        mobileNo: '9870011223',
        email: 'chandrakala@example.com',
        address: 'Wright Town, Jabalpur',
        employeeDetails: ['663fd603468f3b1234567895'],
        items: ['6640a0de1234567890abcde5'],
      },
    ],
    items: [
      {
        orgId: 'org001',
        id: 'afron-fevicol-drum-001',
        name: 'Afron Chemical Fevicol Drum',
        quantity: 50,
        threshold: 10,
        lastDateOfUpdate: new Date(),
        image:
          'https://drive.google.com/file/d/1Oz9Nh2khKqB1X0p-OaA5P-FweiySKLeM/view?usp=sharing',
        updateHistory: [
          {
            updatedBy: 'MH Trading Company',
            quantityChange: 50,
            date: new Date(),
            note: 'Initial stock received from vendor.',
          },
        ],
      },
      {
        orgId: 'org001',
        id: 'fevicol-cpw-001',
        name: 'Fevicol CPW',
        quantity: 20,
        threshold: 2,
        lastDateOfUpdate: new Date(),
        image:
          'https://drive.google.com/file/d/1gzbMl-mYRijGXQ5JscZKanrxoSVDBCVo/view?usp=sharing',
        updateHistory: [
          {
            updatedBy: 'Aamna Trader',
            quantityChange: 20,
            date: new Date(),
            note: 'Initial stock received from vendor.',
          },
        ],
      },
      {
        orgId: 'org001',
        id: '4line-halfkg-tray-001',
        name: '4 Line Half Kg Tray',
        quantity: 2000,
        threshold: 100,
        lastDateOfUpdate: new Date(),
        image:
          'https://drive.google.com/file/d/1g4m9y7BsEZXHKR2iQvyiWcp5WKL2QL9v/view?usp=sharing',
        updateHistory: [
          {
            updatedBy: 'Aamna Trader',
            quantityChange: 2000,
            date: new Date(),
            note: 'Initial stock received from vendor.',
          },
        ],
      },
      {
        orgId: 'org001',
        id: 'lamination-film-14inch-001',
        name: 'Lamination Film 14 Inch',
        quantity: 4,
        threshold: 1,
        lastDateOfUpdate: new Date(),
        image:
          'https://drive.google.com/file/d/1s8MKn1U6FtKwlBmHfKJhgz7T-nrwAfaI/view?usp=sharing',
        updateHistory: [
          {
            updatedBy: 'Sighai Art',
            quantityChange: 4,
            date: new Date(),
            note: 'Initial stock received from vendor.',
          },
        ],
      },
    ],
    vendorPurchases: [
      {
        vendorName: 'MH Trading Co',
        quantityUpdated: 1200,
        cost: 25000,
        date: new Date(),
      },
      {
        vendorName: 'Anajana Trader',
        quantityUpdated: 800,
        cost: 17500,
        date: new Date(),
      },
      {
        vendorName: 'Sighai Arts',
        quantityUpdated: 500,
        cost: 9800,
        date: new Date(),
      },
      {
        vendorName: 'Pragati Offset',
        quantityUpdated: 1500,
        cost: 32000,
        date: new Date(),
      },
      {
        vendorName: 'Ashish Trader',
        quantityUpdated: 1000,
        cost: 21000,
        date: new Date(),
      },
      {
        vendorName: 'Amana Traders',
        quantityUpdated: 650,
        cost: 14000,
        date: new Date(),
      },
    ],
  },

  // === SIGNUP ===
  signUp: (data) => {
    const username = data.email?.split('@')[0] || 'admin';
    const adminEmployee = {
      id: Date.now().toString(), // or use UUID
      username,
      password: data.password,
      role: 'admin',
      name: 'Admin',
    };

    set({
      organization: {
        ...data,
        employees: [adminEmployee],
        orders: [],
        customers: [],
        items: [],
        vendorPurchases: [],
      },
    });
  },

  // === LOGIN ===
  login: (username, password) => {
    const { employees } = get().organization;

    const found = employees.find((emp) => emp.username === username);
    if (!found) {
      toast.error('Username not found');
      return null;
    }

    if (found.password !== password) {
      toast.error('Incorrect password');
      return null;
    }

    toast.success('Login successful');
    return found;
  },

  // === EMPLOYEES CRUD ===
  addEmployee: (employee) => {
    const org = get().organization;
    set({
      organization: {
        ...org,
        employees: [...org.employees, employee],
      },
    });
  },

  updateEmployee: (id, updatedFields) => {
    const org = get().organization;
    set({
      organization: {
        ...org,
        employees: org.employees.map((emp) =>
          emp.id === id ? { ...emp, ...updatedFields } : emp
        ),
      },
    });
  },

  deleteEmployee: (id) => {
    const org = get().organization;
    set({
      organization: {
        ...org,
        employees: org.employees.filter((emp) => emp.id !== id),
      },
    });
  },

  // === CUSTOMERS CRUD ===
  addCustomer: (customer) => {
    const org = get().organization;
    set({
      organization: {
        ...org,
        customers: [...org.customers, customer],
      },
    });
  },

  updateCustomer: (index, updatedFields) => {
    const org = get().organization;
    const updated = [...org.customers];
    updated[index] = { ...updated[index], ...updatedFields };
    set({ organization: { ...org, customers: updated } });
  },

  deleteCustomer: (index) => {
    const org = get().organization;
    const updated = [...org.customers];
    updated.splice(index, 1);
    set({ organization: { ...org, customers: updated } });
  },

  // === VENDOR PURCHASE CRUD ===
  addVendorPurchase: (vendor) => {
    const org = get().organization;
    set({
      organization: {
        ...org,
        vendorPurchases: [...org.vendorPurchases, vendor],
      },
    });
  },

  updateVendorPurchase: (index, updatedFields) => {
    const org = get().organization;
    const updated = [...org.vendorPurchases];
    updated[index] = { ...updated[index], ...updatedFields };
    set({ organization: { ...org, vendorPurchases: updated } });
  },

  deleteVendorPurchase: (index) => {
    const org = get().organization;
    const updated = [...org.vendorPurchases];
    updated.splice(index, 1);
    set({ organization: { ...org, vendorPurchases: updated } });
  },

  // === ORDERS CRUD ===
  addOrder: (order) => {
    const org = get().organization;
    set({
      organization: {
        ...org,
        orders: [...org.orders, order],
      },
    });
  },

  updateOrder: (index, updatedFields) => {
    const org = get().organization;
    const updated = [...org.orders];
    updated[index] = { ...updated[index], ...updatedFields };
    set({ organization: { ...org, orders: updated } });
  },

  deleteOrder: (index) => {
    const org = get().organization;
    const updated = [...org.orders];
    updated.splice(index, 1);
    set({ organization: { ...org, orders: updated } });
  },
}));

export default useObjectStore;
