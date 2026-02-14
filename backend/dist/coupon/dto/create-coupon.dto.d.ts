export declare class CreateCouponDto {
    code: string;
    name: string;
    discountType: string;
    discountValue: number;
    minimumPurchase?: number;
    maximumDiscount?: number;
    usageLimit?: number;
    usageLimitPerUser?: number;
    startDate: string;
    endDate: string;
    isActive?: boolean;
    isFirstTimeOnly?: boolean;
    description?: string;
}
