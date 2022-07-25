
import { Knight } from './Knight'

export interface PieceProps {
	isKnight: boolean
}

export const Piece = ({ isKnight }:PieceProps) =>
	isKnight ? <Knight /> : null
