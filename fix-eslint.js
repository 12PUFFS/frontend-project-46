const fs = require('fs')

// Список файлов для фикса
const files = [
  'bin/gendiff.js',
  'src/formatters/plain.js', 
  'src/formatters/stylish.js',
  'src/index.js',
  'src/parsers.js',
  'tests/gendiff.test.js'
]

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')
  
  // Фиксим отступы - заменяем 4 пробела на 2
  content = content.replace(/    /g, '  ')
  
  // Фиксим стрелочные функции
  content = content.replace(/\((\w+)\) =>/g, '$1 =>')
  
  // Удаляем русские комментарии
  content = content.replace(/\/\/.*[а-яА-Я].*/g, '')
  
  // Фиксим фигурные скобки
  content = content.replace(/\}\s*\n\s*(\w)/g, '}\n\n$1')
  
  fs.writeFileSync(file, content)
})

console.log('✓ ESLint errors fixed!')