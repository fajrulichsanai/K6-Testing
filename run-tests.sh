#!/bin/bash

# Script untuk menjalankan K6 test dengan output ke file

# Warna untuk output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 K6 Testing Runner${NC}"
echo "=================================="

# Buat folder results jika belum ada
mkdir -p results

# Timestamp untuk nama file
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Fungsi untuk menjalankan test
run_test() {
    local test_name=$1
    local test_file=$2
    
    echo -e "\n${YELLOW}Running $test_name...${NC}"
    k6 run \
        --out json=results/${test_name}_${TIMESTAMP}.json \
        --summary-export=results/${test_name}_${TIMESTAMP}_summary.json \
        $test_file
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $test_name completed successfully${NC}"
    else
        echo -e "${RED}❌ $test_name failed${NC}"
    fi
}

# Menu
echo "Pilih test yang ingin dijalankan:"
echo "1. Smoke Test"
echo "2. Load Test"
echo "3. Stress Test"
echo "4. Spike Test"
echo "5. Advanced Test"
echo "6. All Tests"
echo "7. Main Test"

read -p "Pilihan (1-7): " choice

case $choice in
    1)
        run_test "smoke" "tests/smoke.test.js"
        ;;
    2)
        run_test "load" "tests/load.test.js"
        ;;
    3)
        run_test "stress" "tests/stress.test.js"
        ;;
    4)
        run_test "spike" "tests/spike.test.js"
        ;;
    5)
        run_test "advanced" "tests/advanced.test.js"
        ;;
    6)
        echo -e "${YELLOW}Running all tests...${NC}"
        run_test "smoke" "tests/smoke.test.js"
        run_test "load" "tests/load.test.js"
        run_test "stress" "tests/stress.test.js"
        run_test "spike" "tests/spike.test.js"
        ;;
    7)
        run_test "main" "tests/main.test.js"
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo -e "\n${GREEN}=================================="
echo -e "📊 Test results saved in: results/${NC}"
echo -e "${YELLOW}Timestamp: ${TIMESTAMP}${NC}"
