import { Repository } from 'typeorm';
import { Coupon } from './entity/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponService {
    private readonly couponRepo;
    private readonly logger;
    constructor(couponRepo: Repository<Coupon>);
    create(dto: CreateCouponDto): Promise<Coupon>;
    findAll(): Promise<Coupon[]>;
    findOne(id: number): Promise<Coupon>;
    findByCode(code: string): Promise<Coupon>;
    validateCoupon(code: string, cartTotal: number, isFirstTimeUser?: boolean): Promise<{
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
    useCoupon(code: string): Promise<Coupon>;
    update(id: number, dto: UpdateCouponDto): Promise<Coupon>;
    remove(id: number): Promise<Coupon>;
}
