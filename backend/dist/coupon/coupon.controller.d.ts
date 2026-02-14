import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    findAll(): Promise<import("./entity/coupon.entity").Coupon[]>;
    validateCoupon(code: string, cartTotal: string, isFirstTimeUser?: string): Promise<{
        valid: boolean;
        coupon: {
            id: number;
            code: string;
            name: string;
            discountType: string;
            discountValue: number;
        };
        discountAmount: number;
        finalTotal: number;
    }>;
    findOne(id: number): Promise<import("./entity/coupon.entity").Coupon>;
    create(dto: CreateCouponDto): Promise<import("./entity/coupon.entity").Coupon>;
    useCoupon(code: string): Promise<import("./entity/coupon.entity").Coupon>;
    update(id: number, dto: UpdateCouponDto): Promise<import("./entity/coupon.entity").Coupon>;
    remove(id: number): Promise<import("./entity/coupon.entity").Coupon>;
}
