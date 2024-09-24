

def gaus_method_full_pivot(matrix):
    n = len(matrix)
    det = 1
    col_swap = list(range(n)) 


    for i in range(n):
        max_row, max_col = i, i
        for row in range(i, n):
            for col in range(i, n):
                if abs(matrix[row][col]) > abs(matrix[max_row][max_col]):
                    max_row, max_col = row, col
        if max_row != i:
            matrix[i], matrix[max_row] = matrix[max_row], matrix[i]
            det *= -1  
        if max_col != i:
            for row in range(n):
                matrix[row][i], matrix[row][max_col] = matrix[row][max_col], matrix[row][i]
            det *= -1  
            col_swap[i], col_swap[max_col] = col_swap[max_col], col_swap[i]
        pivot = matrix[i][i]
        if pivot == 0:
            return 0  
        for j in range(i, n):
            matrix[i][j] /= pivot
        det *= pivot  
        for j in range(i + 1, n):
            coef = matrix[j][i]
            for k in range(i, n):
                matrix[j][k] -= coef * matrix[i][k]

    return det


k = 8
p = 22
s = 0.02 * k
B = 0.02 * p

matrix = [
    [8.3, 2.62 + s, 4.1, 1.9],
    [3.92, 8.45, 7.78 - s, 2.46],
    [3.77, 7.21 + s, 8.04, 2.28],
    [2.21 , 3.49 , 1.69 , 6.69 ]
]

# Обчислюємо визначник
result = gaus_method_full_pivot(matrix)

print(result)
