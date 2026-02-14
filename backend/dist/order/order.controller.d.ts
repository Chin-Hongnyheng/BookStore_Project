import { OrderService } from './order.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(body: any, paymentImage?: Express.Multer.File): Promise<import("./entity/order.entity").Order>;
    findAll(): Promise<import("./entity/order.entity").Order[]>;
    findOne(id: number): Promise<import("./entity/order.entity").Order>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<import("./entity/order.entity").Order>;
    uploadPayment(id: number, paymentImage: Express.Multer.File): Promise<import("./entity/order.entity").Order>;
    remove(id: number): Promise<void>;
}
