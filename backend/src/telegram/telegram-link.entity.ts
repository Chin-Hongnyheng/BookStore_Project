import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('telegram_links')
export class TelegramLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: string;

  @Column()
  chatId: string;

  @CreateDateColumn()
  createdAt: Date;
}
