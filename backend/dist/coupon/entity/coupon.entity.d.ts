export declare class Coupon {
    id: number;
    code: string;
    name: string;
    discountType: string;
    discountValue: number;
    minimumPurchase: number;
    maximumDiscount: number | null;
    usageLimit: number;
    usageCount: number;
    usageLimitPerUser: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    isFirstTimeOnly: boolean;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}
