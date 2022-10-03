import { Double, ObjectId } from "mongodb";

export interface IAdmin {
  _id: ObjectId;
  name?: string;
  email: string;
  secret: string;
  createdAt: number;
}
export interface IClient {
  _id: ObjectId;
  name?: string;
  email: string;
  isEmailVerified: boolean;
  phoneNumber: string;
  isPhoneNumberVerified: boolean;
  secret: string;
  createdAt: number;
}
export interface IMerchant {
  _id: ObjectId;
  firstName?: string;
  lastName?: string;
  email: string;
  isEmailVerified: boolean;
  secret: string;
  status: EMerchantStatus;
  onboardingAmount?: number | Double;
  commisionType?: ECommisionType;
  commisionPercentage?: number | Double;
  commisionAmount?: number | Double;
  identification?: {
    documentId: ObjectId;
    approvedByAdmin: boolean;
    priority: number;
  }[];
  createdAt: number;
}

export interface IUser {
  _id: ObjectId;
  firstName?: string;
  lastName?: string;
  email: string;
  isEmailVerified: boolean;
  secret: string;
  identification?: {
    documentId: ObjectId;
    approvedByAdmin: boolean;
    priority: number;
  }[];
  createdAt: number;
}

export enum EMerchantStatus {
  Active = "ACTIVE",
  InActive = "INACTIVE",
}
export enum ECommisionType {
  Percentage = "PERCENTAGE",
  Fixed = "FIXED",
}
export interface ICategory {
  _id: ObjectId;
  name: string;
  description?: string;
  status?: ECategoryStatus;
  imageDocumentId?: ObjectId;
  seo?: {
    metaTagTitle?: string;
    metaTagDescription?: string;
    metaTagKeywords?: string;
  };
  createdAt: number;
}
export interface ISubCategory {
  _id: ObjectId;
  name: string;
  categoryId: ObjectId;
  description?: string;
  status?: ESubCategoryStatus;
  imageDocumentId?: ObjectId;
  seo?: {
    metaTagTitle?: string;
    metaTagDescription?: string;
    metaTagKeywords?: string;
  };
  createdAt: number;
}
export interface IProduct {
  _id: ObjectId;
  name: string;
  merchantId: ObjectId;
  status: EProductStatus;
  brandId?: ObjectId;
  categoryId: ObjectId;
  subCategoryId: ObjectId;
  description?: string;
  images?: {
    documentId: ObjectId;
    priority: number;
  }[];
  price:number;
  seo?: {
    metaTagTitle?: string;
    metaTagDescription?: string;
    metaTagKeywords?: string;
  };
  variantParameters: {
    styleEnabled: boolean;
    styleList: string[];
    sizeEnabled: boolean;
    sizeList: string[];
    colorEnabled: boolean;
    dimensionHeightEnabled: boolean;
    dimensionWidthEnabled: boolean;
    dimensionThicknessEnabled: boolean;
    dimensionUnitId?: ObjectId;
  };
  variants: IProductVariant[];
  createdAt: number;
}
export interface IProductVariant {
  name: string;
  priority: number;
  style: string;
  size: string;
  colorId: ObjectId;
  dimensions: {
    height: number | Double;
    width?: number | Double;
    thickness?: number | Double;
  };
  minPurchaseQuantity: number;
  availableQuantity: number;
  discountPercentage: number;
  price: number | Double;
  // stock:number;
  images?: {
    documentId: ObjectId;
    priority: number;
  }[];
  createdAt: number;
}
export enum EProductStatus {
  Active = "ACTIVE",
  InActive = "INACTIVE",
}
export enum OrderStatus {
  Recieved = "Recieved",
  Payment_Accepted = "Payment_Accepted",
  Inprogress = "Inprogress",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Refund_Inprogress = "Refund_Inprogress",
  Refund_Done = "Refund_Done"
}
// export enum TransactionStatus {
//   Successful = "Successful",
//   Failed = "Failed"
// }
export enum ECategoryStatus {
  Active = "ACTIVE",
  InActive = "INACTIVE",
}
export enum ESubCategoryStatus {
  Active = "ACTIVE",
  InActive = "INACTIVE",
}
export interface IBrand {
  _id: ObjectId;
  name: string;
  createdAt: number;
  priority: number;
}
export interface IDocument {
  _id: ObjectId;
  fileName: string;
  sizeInBytes: number;
  createdAt: number;
}
export interface IColor {
  _id: ObjectId;
  name: string;
  hexValue: string;
  createdAt: number;
  priority: number;
}
export interface IUnit {
  _id: ObjectId;
  name: string;
  createdAt: number;
  priority: number;
}
export interface Order {
  _id: ObjectId;
  products: {
    sellerId:string,
    productId:string,
    saleId:ObjectId
  }[];
  address: {
    addressId:ObjectId,
    country:string,
    state:string,
    city:string,
    postal_code:string,
    main_address_text:string
  };
  total_price:number;
  customerDetail:{
    userId:string,
    name:string,
    phone:number,
    email:string,
    customerId:ObjectId
  };
  seller:string;
  discount:string[];
  coupon:string[];
  order_status:OrderStatus;
  transactionDetail:{
    transactionId: ObjectId,
    transactionDate: number,
    status: string,
    transactionMethod: transactionMethod,
    transactionNumber: string
  };
  createdAt:number;
  expectedDeliveryDate: number;
}
export enum transactionMethod {
  DEBIT_CARD = "DEBIT_CARD",
  CREDIT_CARD = "CREDIT_CARD",
  UPI = "UPI",
  PAYTM = "PAYTM",
  GPAY = "GPAY",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY"
}
