import re
import sys


def normalize(text: str) -> str:
    text = text.strip()
    text = re.sub(r"\s+", " ", text)
    text = text.replace("  ", " ")
    return text


if __name__ == "__main__":
    raw = sys.stdin.read()
    print(normalize(raw))
