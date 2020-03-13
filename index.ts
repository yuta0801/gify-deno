async function main() {
  if (Deno.args.length < 2)
    throw 'Error: This tool needs 2 args input and output file path'

  const [input, output] = Deno.args

  const filter = [
    'fps=12,split[a][b]',
    '[a]palettegen[p]',
    '[b][p]paletteuse=dither=none',
  ].join(';')

  const args = [
    'ffmpeg',
    '-loglevel', 'error',
    '-stats',
    '-i', input,
    '-filter_complex', filter,
    '-y', output,
  ]

  console.log('Converting...')

  const p = Deno.run({ args })
  await p.status()
}

main().catch(error => console.log(error))
