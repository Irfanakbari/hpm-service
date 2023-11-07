export class CreateOrderDto {
  kode: string;
  part_no: string;
  part_name?: string | null;
  part_color?: string | null;
  qty: number;
  to1?: string | null;
  to2?: string | null;
  date_local?: string | null;
  time_local?: string | null;
  date_export?: string | null;
  time_export?: string | null;
  weekly?: string | null;
  type_part?: string | null;
  seq_no?: string | null;
  kd_lot_no?: string | null;
  date?: string | null;
  time?: string | null;
}
