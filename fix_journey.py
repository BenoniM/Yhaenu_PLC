import re

path = r'c:\Users\Benoni\Desktop\Yhaenu_PLC\src\pages\Aboutpage.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove journeyVideo import line
content = re.sub(r"import journeyVideo from '[^']+'\r?\n", '', content)

# 2. Add JourneySection import right after the React import line
old = "import React, { useRef, useState, useEffect } from 'react'"
new = "import React, { useRef, useState, useEffect } from 'react'\nimport JourneySection from '../components/JourneySection'"
content = content.replace(old, new, 1)

# 3. Remove the inline MilestoneItem + JourneySection components
# They live between "// -- Journey Milestone Item" and "// -- Page"
content = re.sub(
    r'// \u2500+ Journey Milestone Item \u2500+.*?(?=// \u2500+ Page)',
    '',
    content,
    flags=re.DOTALL
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done. Lines:', content.count('\n'))
