type ConveyorKey = keyof Window['conveyor']

export const useConveyor = <T extends ConveyorKey | undefined = undefined>(
  key?: T
): T extends ConveyorKey ? Window['conveyor'][T] : Window['conveyor'] => {
  const conveyor = window.conveyor

  if (key) {
    return conveyor[key] as any
  }

  return conveyor as any
}
