    .section __TEXT,__text
    .globl   _main
    .align   2
_main:
    // write(1, msg, msglen)
    mov     x0, #1                // stdout fd
    adrp    x1, msg@PAGE          // top half of msg addr
    add     x1, x1, msg@PAGEOFF   // x1 = &msg
    movz    x16, #0x200, lsl #16  // hi half of 0x2000004
    movk    x16, #0x004           // lo half → x16 = write syscall
    mov     x2, #14               // length of the string
    svc     #0

    // return 0
    mov     x0, #0
    ret

    .section __TEXT,__cstring
msg:
    .asciz   "Hello, world\n"
