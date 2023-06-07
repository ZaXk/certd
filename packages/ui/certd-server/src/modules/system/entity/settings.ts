import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 */
@Entity('sys_settings')
export class SettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'user_id', comment: '用户id' })
  userId: number;
  @Column({ comment: '名称', length: 100 })
  name: string;
  @Column({ name: 'setting', comment: '设置', length: 1024, nullable: true })
  setting: string;

  @Column({
    name: 'create_time',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
  @Column({
    name: 'update_time',
    comment: '修改时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
