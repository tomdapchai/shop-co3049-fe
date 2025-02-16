export type ProductView = {
    slug: string;
    name: string;
    price: number;
    image: string;
    overview: string;
    rating: number;
    size: string;
    color: string;
};

export type Product = {
    slug: string;
    name: string;
    price: number;
    overview: string;
    description: string;
    size: string[];
    color: string[];
    tags: string[];
};

// this will be the return type of getProduct(slug: string): Promise<ProductDetail>
export type ProductDetail = {
    slug: string;
    name: string;
    price: number;
    size: string[];
    color: string[];
    images: Image[];
    overview: string;
    description: string;
    reviews: Review[];
    tags: string[];
    descriptionOriginal?: string;
};

export type ImageDetail = {
    imageId: string;
    src: string;
};

export type ProductImage = {
    imageId: string;
    src: string;
    productId: string;
};

export type ProductImageCreate = Omit<ProductImage, "productId"> & {
    type: string;
};

export type BlogImageCreate = {
    imageId: string;
    src: string;
    isThumbnail: boolean;
};

export type Review = {
    reviewId: string;
    productId: string;
    comment: string;
    rating: number;
    reviewer: string;
    date: string;
    userId: string;
};

export type Order = {
    orderId: string;
    userId: string | null;
    name: string;
    products: {
        productId: string;
        quantity: number;
        color: string;
        size: string;
        productName: string;
        productImage: string;
        productPrice: number;
    }[];
    phone_number: string;
    address: string;
    status: string;
    createdAt: string;
    completedAt: string | null;
    total: number;
};

export type productOrderTrue = {
    productId: string;
    quantity: number;
    color: string;
    size: string;
    productName: string;
    productImage: string;
    productPrice: number;
};

export type productOrder = Omit<
    productOrderTrue,
    "productPrice" | "productImage" | "productName"
>;

export type OrderCreate = {
    userId: string | null;
    products: productOrder[];
    phoneNumber: string;
    email: string;
    address: string;
    total: number;
    name: string;
};

type Address = {
    street: string;
    city: string;
};

export type CartItem = {
    quantity: number;
    color: string;
    size: string;
    productName: string;
    productId: string;
    productImage: string; // Path to the product image
    productPrice: number; // Price of the product
};

export type User = {
    userId: number; // AUTO INCREMENT or UUID
    username: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    cart: CartItem[]; // JSON structure for cart
    status: "active" | "banned";
    address?: Address;
    joinAt: string;
};

export type Contact = {
    contactId: number; // AUTO INCREMENT
    name: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
};

export type Blog = {
    blogId: string; // slug
    title: string;
    content: string;
    tags?: string[]; // JSON array referencing TAG.tagName
    contentOriginal?: string;
};

export type BlogTrue = {
    blogId: string; // slug
    title: string;
    content: string;
    tags: string[];
    posted: string;
    contentOriginal?: string;
};

export type Tag = {
    tagName: string; // primary key
};

export type siteInfo = {
    about: string;
    aboutOriginal: string;
    phoneNumber: string;
    address: string;
    email: string;
};
