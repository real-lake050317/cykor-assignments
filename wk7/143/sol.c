#include <stdio.h>

int asc_4080[] = {0x48, 0x52, 0x58, 0x60, 0x66,
                  0x4E, 0x64, 0x7E, 0x82, 0x88};  // length  = + 1

int main() {
  for (int i = 0; i < 10; i++) {
    printf("%d ", asc_4080[i] + 1);
  }
}