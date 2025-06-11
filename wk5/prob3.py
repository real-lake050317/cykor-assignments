ciphertext = "KCOIH VY KXD UDSKCQM JVZOCD TJ KCOIHVYI QSP XVY JQUKVTS VY PTIVSQSK FVKXVS KXD CDHOWMVUQS HQCKA \n\
IQSA TJ XVY UTIIDSKY QSP QUKVTSY XQRD WDDS UXQCQUKDCVGDP QY CQUVYK TC IVYTZASVYKVU QSP XD XQY IQPD JQMYD QSP IVYMDQPVSZ YKQKDIDSKY QSP \n\
HCTITKDP UTSYHVCQUA KXDTCVDY KT Q PDZCDD OSHCDUDPDSKDP VS QIDCVUQS HTMVKVUY \n\
KCOIHY QUKVTSY DYHDUVQMMA VS XVY YDUTSP KDCI XQRD WDDS PDYUCVWDP QY QOKXTCVKQCVQS QSP UTSKCVWOKVSZ KT PDITUCQKVU WQUN YMVPVSZ \n\
QJKDC XVY JVCYK KDCI YUXTMQCY QSP XVYKTCVQSY CQSNDP XVI QY TSD TJ KXD FTCYK HCDYVPDSKY VS QIDCVUQS XVYKTCA"

substitutions = {
    "A": "Y",
    "B": "-",
    "C": "R",
    "D": "E",
    "E": "-",
    "F": "W",
    "G": "Z",
    "H": "P",
    "I": "M",
    "J": "F",
    "K": "T",
    "L": "-",
    "M": "L",
    "N": "K",
    "O": "U",
    "P": "D",
    "Q": "A",
    "R": "V",
    "S": "N",
    "T": "O",
    "U": "C",
    "V": "I",
    "W": "B",
    "X": "H",
    "Y": "S",
    "Z": "G",
}

for i in ciphertext:
    if i in substitutions:
        print(substitutions[i], end="")
    else:
        print(i, end="")

print()