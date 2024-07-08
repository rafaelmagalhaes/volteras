//@ts-nocheck
import { Button } from '@/components/Button.tsx';

export const Export = ({ onExport }) => (
  <Button variant="outline" onClick={(e) => onExport(e?.target?.value)}>
    Export
  </Button>
);
