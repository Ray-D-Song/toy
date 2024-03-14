export interface Options {
	/**
	 * Method name used to specify the default value macro
	 *
	 * @default 'createDefault'
	 */
	macroName: string

	/**
	 * Path to the target, can be a folder or file path, default src/*
	 */
	include: string[]

	/**
	 * Paths to be excluded, can be a folder or file path
	 *
	 * @default []
	 */
	exclude: string[]
}
